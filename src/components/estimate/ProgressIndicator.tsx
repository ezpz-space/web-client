'use client';

import { cn } from '@/lib/utils';

const STEPS = [
  { label: '기본 정보' },
  { label: '주소' },
];

interface ProgressIndicatorProps {
  currentStep: number; // 1-based
  skippedSteps?: number[];
}

export function ProgressIndicator({
  currentStep,
  skippedSteps = [],
}: ProgressIndicatorProps) {
  return (
    <div className="flex items-center justify-between px-2 py-4" role="list" aria-label="견적 진행 단계">
      {STEPS.map((step, i) => {
        const stepNum = i + 1;
        const isCompleted = stepNum < currentStep;
        const isCurrent = stepNum === currentStep;
        const isSkipped = skippedSteps.includes(stepNum);

        return (
          <div key={stepNum} className="flex flex-1 items-center" role="listitem" aria-current={isCurrent ? 'step' : undefined}>
            {/* Connector line (before dot, except first) */}
            {i > 0 && (
              <div
                className={cn(
                  'h-0.5 flex-1',
                  isCompleted || isCurrent ? 'bg-primary' : 'bg-gray-300',
                  isSkipped && 'border-t border-dashed border-gray-300 bg-transparent',
                )}
              />
            )}
            {/* Dot + Label */}
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold',
                  isCompleted && 'bg-primary text-white',
                  isCurrent && 'bg-primary text-white ring-2 ring-primary/30',
                  !isCompleted && !isCurrent && 'border-2 border-gray-300 text-gray-400',
                )}
              >
                {isCompleted ? (
                  <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={cn(
                  'text-[10px] whitespace-nowrap',
                  isCurrent ? 'font-bold text-primary' : 'text-gray-400',
                )}
              >
                {step.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
