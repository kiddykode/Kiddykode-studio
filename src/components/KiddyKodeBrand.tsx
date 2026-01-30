import { cn } from '@/lib/utils';
interface KiddyKodeBrandProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
const KiddyKodeBrand = ({
  className,
  size = 'md'
}: KiddyKodeBrandProps) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-5xl md:text-6xl'
  };
  const chevronSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-2xl md:text-3xl'
  };
  return <span className={cn('font-black inline-flex items-baseline', sizeClasses[size], className)}>
      {/* "kiddykode" as one word with multicolored letters */}
      <span className="text-[#E85D75]">k</span>
      <span className="text-[#F5B824]">i</span>
      <span className="text-[#4CAF9D]">d</span>
      <span className="text-[#E85D75]">d</span>
      <span className="text-[#F5B824]">y</span>
      <span className="text-white">kode</span>
    </span>;
};
export default KiddyKodeBrand;