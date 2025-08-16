import {
  ArrowRight,
  Zap,
  Brain,
  Globe,
  Clock,
  Palette,
  BarChart3,
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  Award,
  Sparkles,
  Rocket,
  Target,
  Menu,
  X,
  ChevronDown,
  Play,
  Pause,
  Settings,
  Download,
  Upload,
  Search,
  Filter,
  Eye,
  EyeOff,
  Heart,
  Share,
  Copy,
  Edit,
  Trash,
  Plus,
  Minus,
  type LucideIcon
} from 'lucide-react';

// Icon mapping for consistent usage
export const icons = {
  // Navigation
  arrowRight: ArrowRight,
  menu: Menu,
  close: X,
  chevronDown: ChevronDown,
  
  // Actions
  play: Play,
  pause: Pause,
  settings: Settings,
  download: Download,
  upload: Upload,
  search: Search,
  filter: Filter,
  edit: Edit,
  trash: Trash,
  plus: Plus,
  minus: Minus,
  copy: Copy,
  share: Share,
  
  // Status & Feedback
  checkCircle: CheckCircle,
  star: Star,
  heart: Heart,
  eye: Eye,
  eyeOff: EyeOff,
  
  // Features
  zap: Zap,
  brain: Brain,
  globe: Globe,
  clock: Clock,
  palette: Palette,
  barChart: BarChart3,
  users: Users,
  trendingUp: TrendingUp,
  award: Award,
  sparkles: Sparkles,
  rocket: Rocket,
  target: Target,
} as const;

export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  'aria-label'?: string;
}

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  className = '', 
  'aria-label': ariaLabel,
  ...props 
}) => {
  const IconComponent = icons[name] as LucideIcon;
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in IconLibrary`);
    return null;
  }
  
  return (
    <IconComponent
      size={size}
      className={className}
      aria-label={ariaLabel || name}
      {...props}
    />
  );
};

// Export individual icons for direct usage
export {
  ArrowRight,
  Zap,
  Brain,
  Globe,
  Clock,
  Palette,
  BarChart3,
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  Award,
  Sparkles,
  Rocket,
  Target
};