// modules/quiz/components/OptionButton.tsx
export const OptionButton = ({ option, selected, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left rounded-2xl border-2 transition-all duration-200 group p-4"
    style={{
      borderColor: selected ? "black" : "transparent",
      background: "white",
    }}
  >
    <div className="flex items-center gap-4">
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm" style={{ color: "#111827" }}>
          {option.label}
        </div>
        {option.desc && (
          <div className="text-xs mt-0.5" style={{ color: "#6B7280" }}>
            {option.desc}
          </div>
        )}
      </div>
    </div>
  </button>
)
