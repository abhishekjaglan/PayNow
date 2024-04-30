export function InputBox({ label, placeholder, onChange }){
    return (
        <div>
            <div className="font-medium text-sm text-left py-2">
                {label}
            </div>
            <input placeholder={placeholder} onChange={onChange} className="border rounded-lg border-slate-200 px-2 py-1 w-full" />
        </div>
    )
}