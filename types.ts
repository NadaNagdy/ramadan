
export interface Dua {
  id: number;
  day: number;
  arabicTitle: string;
  dua: string;
  category: string;
  translation?: string;
}

export interface Category {
  id: string;
  arabicName: string;
  icon: string;
}

export interface SpiritualReflection {
  text: string;
  source?: string;
}

export interface PlannerTask {
  day: number;
  event: string;
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  type: 'fasting' | 'prayer' | 'suhoor' | 'iftar';
}
