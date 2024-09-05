import { PlanFeature } from "@prisma/client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { diffForHuman } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Edit, Trash } from "lucide-react"

import UpdateFeatureModal from "./features/update-feature-dialog"
import { DeleteModal } from "../ui/delete-modal"
import { RestoreModal } from "../ui/restore-modal"
import { forceDeletePlanFeatureAction, restorePlanFeatureAction, softDeletePlanFeatureAction } from "@/actions/plans"

type Props = {
  features: PlanFeature[]
}

const DisplayPlanFeatures = ({ features }: Props) => {
  return (
    <div className="grid gap-2">
      <Table className="shadow-md rounded-md overflow-hidden">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Is Active</TableHead>
            <TableHead>Deleted</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="rounded-md shadow-sm">
          {features.map((feature) => (
            <TableRow key={`feature-${feature.id}`}>
              <TableCell className="font-medium">{feature.id}</TableCell>
              <TableCell>{feature.name}</TableCell>
              <TableCell className="line-clamp-1">{feature.description}</TableCell>
              <TableCell>{feature.isActive ? <span className="text-green-700">Yes</span> : <span className="text-green-700">No</span>}</TableCell>
              <TableCell>{!feature.deletedAt ? "No" : diffForHuman(feature.deletedAt)}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <UpdateFeatureModal feature={feature} />
                  {!feature.deletedAt ? <DeleteModal id={feature.id} softAction={softDeletePlanFeatureAction} forceAction={forceDeletePlanFeatureAction} /> : <RestoreModal id={feature.id} action={restorePlanFeatureAction} />}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default DisplayPlanFeatures
