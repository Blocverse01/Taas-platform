import type { Meta, StoryObj } from '@storybook/react';
import { TeamPage } from './teamPage';

const meta = {
  title: 'Project/Team Page',
  component: TeamPage,
  tags: ['autodocs'],
  args: {
    teamMembers: [],
    projectId: 'sample-project-id',
  },
} satisfies Meta<typeof TeamPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TeamPage_: Story = {};
