import {
  Layers, Flame, Columns3, Box, Building2, Home, Droplets, Paintbrush, Container, Grid3x3, Syringe, Thermometer,
  BadgeCheck, FileCheck2, HardHat, ShieldCheck, Ruler, FlaskConical, Target, type LucideIcon,
} from 'lucide-react';
import type { ServiceIcon } from '../data/services';
import type { TrustIcon } from '../data/content';

export const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  layers: Layers, flame: Flame, pile: Columns3, box: Box, building: Building2, roof: Home, droplets: Droplets,
  brush: Paintbrush, container: Container, grid: Grid3x3, syringe: Syringe, thermometer: Thermometer,
};

export const trustIcons: Record<TrustIcon, LucideIcon> = {
  badge: BadgeCheck, file: FileCheck2, hardhat: HardHat, shield: ShieldCheck, ruler: Ruler, flask: FlaskConical, target: Target,
};
