import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from backend.main import app
from backend.database.session import Base, get_db

# Use an in-memory SQLite database for test isolation
SQLALCHEMY_TEST_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_TEST_DATABASE_URL,
    connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(autouse=True)
def setup_database():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

client = TestClient(app)

def test_signup_success():
    response = client.post(
        "/api/auth/signup",
        json={
            "username": "surya_test",
            "password": "strongpassword123",
            "confirm_password": "strongpassword123"
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert data["user"]["username"] == "surya_test"

def test_signup_duplicate_username():
    payload = {
        "username": "surya_test",
        "password": "password123",
        "confirm_password": "password123"
    }
    res1 = client.post("/api/auth/signup", json=payload)
    assert res1.status_code == 201

    res2 = client.post("/api/auth/signup", json=payload)
    assert res2.status_code == 400
    assert "already registered" in res2.json()["detail"]

def test_signup_password_mismatch():
    response = client.post(
        "/api/auth/signup",
        json={
            "username": "surya_test",
            "password": "password123",
            "confirm_password": "different_password"
        }
    )
    assert response.status_code == 422

def test_login_success_and_get_me():
    # 1. Signup
    client.post(
        "/api/auth/signup",
        json={
            "username": "auratester",
            "password": "secretpassword",
            "confirm_password": "secretpassword"
        }
    )

    # 2. Login
    login_res = client.post(
        "/api/auth/login",
        json={
            "username": "auratester",
            "password": "secretpassword"
        }
    )
    assert login_res.status_code == 200
    token = login_res.json()["access_token"]

    # 3. Access protected /me endpoint
    me_res = client.get(
        "/api/auth/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert me_res.status_code == 200
    assert me_res.json()["username"] == "auratester"

def test_login_invalid_password():
    client.post(
        "/api/auth/signup",
        json={
            "username": "user1",
            "password": "correct_password",
            "confirm_password": "correct_password"
        }
    )
    res = client.post(
        "/api/auth/login",
        json={
            "username": "user1",
            "password": "wrong_password"
        }
    )
    assert res.status_code == 401
    assert "Invalid username or password" in res.json()["detail"]
