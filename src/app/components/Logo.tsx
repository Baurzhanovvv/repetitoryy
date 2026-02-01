export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left speech bubble with Q */}
        <path d="M6 16C6 13.7909 7.79086 12 10 12H16C18.2091 12 20 13.7909 20 16V22C20 24.2091 18.2091 26 16 26H12L9 29V26H10C7.79086 26 6 24.2091 6 22V16Z" fill="#2563EB"/>
        <text x="13" y="21" fill="white" fontSize="10" fontWeight="bold" fontFamily="Montserrat, sans-serif" textAnchor="middle">Q</text>
        
        {/* Right speech bubble with Ә */}
        <path d="M20 16C20 13.7909 21.7909 12 24 12H30C32.2091 12 34 13.7909 34 16V22C34 24.2091 32.2091 26 30 26H31L28 29V26H24C21.7909 26 20 24.2091 20 22V16Z" fill="#F97316"/>
        <text x="27" y="21" fill="white" fontSize="10" fontWeight="bold" fontFamily="Montserrat, sans-serif" textAnchor="middle">Ә</text>
      </svg>
      <div className="flex flex-col leading-tight">
        <span className="font-semibold text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>Репетитор Рядом</span>
        <span className="text-xs text-muted-foreground">Онлайн школа</span>
      </div>
    </div>
  );
}
