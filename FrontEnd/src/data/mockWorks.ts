import type { Work } from '../types/work';

export const mockWorks: Work[] = [
  {
    id: 'W001',
    name: 'Screen Senior Developer CVs',
    progress: 60,
    status: 'in-progress',
    description: 'Screen uploaded CVs against the Senior Developer job description.',
    updatedAt: '2 min ago',
  },
  {
    id: 'W002',
    name: 'Employee Onboarding',
    progress: 40,
    status: 'in-progress',
    description: 'Prepare onboarding tasks for the new employee.',
    updatedAt: '10 min ago',
  },
  {
    id: 'W003',
    name: 'Send Shortlist to Hiring Manager',
    progress: 80,
    status: 'waiting-approval',
    description: 'Shortlisted candidates are ready for HR approval.',
    updatedAt: '15 min ago',
  },
  {
    id: 'W004',
    name: 'Gmail Permission',
    progress: 70,
    status: 'permission-required',
    description: 'Permission is required to send the recruitment email.',
    updatedAt: '20 min ago',
  },
  {
    id: 'W005',
    name: 'Employee Onboarding',
    progress: 100,
    status: 'completed',
    description: 'Onboarding workflow has been completed.',
    updatedAt: '1 hour ago',
  },
];