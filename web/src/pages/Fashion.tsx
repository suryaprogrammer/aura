import React from 'react';
import { Shirt, Plus, Tag, Sparkles } from 'lucide-react';

export const Fashion: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Shirt className="text-[#10B981]" size={22} />
            <h1 className="text-xl font-bold text-[#111827]">Fashion & Wardrobe Notes</h1>
          </div>
          <p className="text-xs text-[#6B7280] mt-1">
            Wardrobe Items, Outfits, Colors & Wishlist Management
          </p>
        </div>

        <button className="px-4 py-2 bg-[#111827] hover:bg-[#1F2937] text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-xs self-start sm:self-auto">
          <Plus size={15} />
          <span>Add Wardrobe Item</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-3">
            <Shirt size={20} />
          </div>
          <h3 className="text-sm font-bold text-[#111827]">Capsule Wardrobe</h3>
          <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
            Minimalist essentials: White Oxford Shirts, Charcoal Trousers, Dark Denim, Clean Sneakers, Structured Blazers.
          </p>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-3">
            <Sparkles size={20} />
          </div>
          <h3 className="text-sm font-bold text-[#111827]">Color Palette Notes</h3>
          <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
            Primary Neutrals: Off-white, Charcoal, Black, Navy, Olive. Accent highlights: Sage Green.
          </p>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-3">
            <Tag size={20} />
          </div>
          <h3 className="text-sm font-bold text-[#111827]">Wardrobe Wishlist</h3>
          <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
            Minimalist Leather Sneakers, Linen Button-down, Tailored Trousers, Minimal Watch.
          </p>
        </div>
      </div>
    </div>
  );
};
