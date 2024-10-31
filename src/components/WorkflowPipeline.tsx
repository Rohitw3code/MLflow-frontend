import React, { useState, useRef, useEffect } from 'react';
import { 
  Database, 
  FileInput, 
  AlertCircle, 
  Code2, 
  Split, 
  Cpu, 
  TestTube, 
  PlayCircle 
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  completed?: boolean;
}

const workflowSteps: WorkflowStep[] = [
  {
    id: 'load',
    icon: <Database className="w-5 h-5" />,
    title: 'Load Dataset',
    description: 'Import your training data'
  },
  {
    id: 'preprocess',
    icon: <FileInput className="w-5 h-5" />,
    title: 'Data Preprocessing',
    description: 'Clean and prepare your data'
  },
  {
    id: 'missing',
    icon: <AlertCircle className="w-5 h-5" />,
    title: 'Missing Data',
    description: 'Handle missing values'
  },
  {
    id: 'encoding',
    icon: <Code2 className="w-5 h-5" />,
    title: 'Data Encoding',
    description: 'Encode categorical variables'
  },
  {
    id: 'split',
    icon: <Split className="w-5 h-5" />,
    title: 'Train-Test Split',
    description: 'Split your dataset'
  },
  {
    id: 'train',
    icon: <Cpu className="w-5 h-5" />,
    title: 'Train',
    description: 'Train your model'
  },
  {
    id: 'test',
    icon: <TestTube className="w-5 h-5" />,
    title: 'Test',
    description: 'Evaluate model performance'
  },
  {
    id: 'predict',
    icon: <PlayCircle className="w-5 h-5" />,
    title: 'Predict',
    description: 'Make predictions'
  }
];

interface WorkflowStepProps extends WorkflowStep {
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
  isLast: boolean;
}

function WorkflowStepComponent({ 
  icon, 
  title, 
  description, 
  isActive, 
  isCompleted,
  onClick,
  isLast
}: WorkflowStepProps) {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        className={`w-full flex items-start p-4 space-x-2 transition-colors ${
          isActive 
            ? 'bg-purple-600/20 border-r-2 border-purple-600' 
            : 'hover:bg-white/5'
        }`}
      >
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
          ${isCompleted 
            ? 'bg-green-500/20 text-green-400' 
            : isActive 
              ? 'bg-purple-500/20 text-purple-400'
              : 'bg-gray-700 text-gray-400'
          }`}>
          {icon}
        </div>
        <div className="flex-1 text-left">
          <h3 className={`font-medium text-sm ${isActive ? 'text-white' : 'text-gray-300'}`}>
            {title}
          </h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </button>
      
      {!isLast && (
        <div className="absolute left-7 top-12 bottom-0 w-0.5 bg-gray-700" />
      )}
    </div>
  );
}

export function WorkflowPipeline() {
  const [activeStep, setActiveStep] = useState<string>('load');
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [isOpen, setIsOpen] = useState(true);
  const pipelineRef = useRef<HTMLDivElement | null>(null);

  const handleStepClick = (stepId: string) => {
    setActiveStep(stepId);
    if (!completedSteps.has(stepId)) {
      setCompletedSteps(new Set([...completedSteps, stepId]));
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (pipelineRef.current && !pipelineRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // if (!isOpen) return null; // Hide the component if closed

  return (
    <div ref={pipelineRef} className="fixed inset-y-0 left-64 w-72 bg-slate-800 z-40">
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-white font-semibold">Workflow Pipeline</h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          {workflowSteps.map((step, index) => (
            <WorkflowStepComponent
              key={step.id}
              {...step}
              isActive={activeStep === step.id}
              isCompleted={completedSteps.has(step.id)}
              onClick={() => handleStepClick(step.id)}
              isLast={index === workflowSteps.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WorkflowPipeline;