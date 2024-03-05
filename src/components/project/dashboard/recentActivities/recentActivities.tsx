import React, { ComponentProps, FC } from 'react';
import { ActivitiesTemplate } from './activitiesTemplate';
import Link from 'next/link';

interface RecentActivitiesProps {
  activities: ComponentProps<typeof ActivitiesTemplate>['activities'];
  projectId?: string;
}

const RecentActivities: FC<RecentActivitiesProps> = ({ activities, projectId }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl text-t-black font-medium">Recent Activities</h1>

        {projectId && (
          <Link
            className="font-sm text-t-purple font-medium"
            href={`/dashboard/projects/${projectId}/activities`}
          >
            View All
          </Link>
        )}
      </div>
      <div className="mt-4">
        <ActivitiesTemplate activities={activities} />
      </div>
    </div>
  );
};

export { RecentActivities };
