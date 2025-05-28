import { CircleUserRound } from 'lucide-react';

type LogoProps = {
  className?: string;
  variant?: 'dark' | 'light';
};

const Logo = ({ className = '', variant = 'dark' }: LogoProps) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-primary-500';

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <CircleUserRound className={`h-8 w-8 ${textColor}`} />
        <div className="absolute -right-1 -bottom-1 w-3 h-3 bg-secondary-500 rounded-full"></div>
      </div>
      <div className={`ml-2 font-serif font-semibold text-xl ${textColor}`}>
        Dream<span className="text-secondary-500">Architects</span>
      </div>
    </div>
  );
};

export default Logo;