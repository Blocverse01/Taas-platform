import { Meta, StoryObj } from '@storybook/react';
import { ProjectSidebar } from '.';

const projectId = '1123433';

const meta = {
  title: 'Project/Project Sidebar',
  component: ProjectSidebar,
  tags: ['autodocs'],
  args: {
    projectId,
  },
  parameters: {
    layout: 'centered',
    nextjs: {
      router: {
        pathname: '/dashboard/projects/[projectId]',
        asPath: `/dashboard/projects/${projectId}`,
        query: {
          projectId,
        },
      },
    },
  },
} satisfies Meta<typeof ProjectSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
