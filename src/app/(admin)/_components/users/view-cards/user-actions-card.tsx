import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminRoutes } from "@/lib/route";
import { Plan, Subscription, User } from "@prisma/client";
import { CalendarIcon } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

type Props = {
  user: User;
};

export function UserActionsCard({ user }: Props) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li>
            <Link
              href={adminRoutes.userSubscriptions(user.id)}
              className="font-medium flex gap-2 items-center border hover:border-orange-200 rounded-md p-1 px-2 transition-all"
            >
              <Image
                src={"/images/defaults/subscriptions.svg"}
                alt={user.name}
                width={20}
                height={20}
              />
              Subscriptions
            </Link>
          </li>

          <li>
            <Link
              href={adminRoutes.userTakenExams(user.id)}
              className="font-medium flex gap-2 items-center border hover:border-orange-200 rounded-md p-1 px-2 transition-all"
            >
              <Image
                src={"/images/defaults/exam.svg"}
                alt={user.name}
                width={20}
                height={20}
              />
              Taken Exams
            </Link>
          </li>

          <li>
            <Link
              href={adminRoutes.userActivities(user.id)}
              className="font-medium flex gap-2 items-center border hover:border-orange-200 rounded-md p-1 px-2 transition-all"
            >
              <Image
                src={"/images/defaults/activity.svg"}
                alt={user.name}
                width={20}
                height={20}
              />
              Activity
            </Link>
          </li>

          <li>
            <Link
              href={adminRoutes.userLoginHistory(user.id)}
              className="font-medium flex gap-2 items-center border hover:border-orange-200 rounded-md p-1 px-2 transition-all"
            >
              <Image
                src={"/images/defaults/login-history.svg"}
                alt={user.name}
                width={20}
                height={20}
              />
              Login History
            </Link>
          </li>

          <li>
            <Link
              href={adminRoutes.userAnalyticalModels(user.id)}
              className="font-medium flex gap-2 items-center border hover:border-orange-200 rounded-md p-1 px-2 transition-all"
            >
              <Image
                src={"/images/defaults/analysis.svg"}
                alt={user.name}
                width={20}
                height={20}
              />
              Analytics
            </Link>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
