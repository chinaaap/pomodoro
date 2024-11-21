import React from "react";
import { X } from "lucide-react";

interface StretchPopupProps {
  onClose: () => void;
}

export const StretchPopup: React.FC<StretchPopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ストレッチの時間です
        </h2>

        <div className="space-y-4 text-gray-600">
          <p className="font-medium">手軽にできるストレッチ:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>首を左右に傾け、各方向で15秒キープ</li>
            <li>両肩を上げて、数秒間キープした後、リラックス</li>
            <li>片腕を前に伸ばし、反対の手で軽く押して15秒キープ</li>
            <li>両手を前に伸ばし、背中を丸めるようにして15秒キープ</li>
            <li>椅子に座ったまま、上半身を左右にひねり、各方向で15秒キープ</li>
            <li>立った状態で片足を後ろに引き、かかとを床につけて15秒キープ</li>
            <li>
              壁に手をつき、片足を後ろに引いてかかとを床につけ、15秒キープ
            </li>
          </ul>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Done!
        </button>
      </div>
    </div>
  );
};
