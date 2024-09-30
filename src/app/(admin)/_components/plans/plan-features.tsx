import UpdateFeatureModal from "./features/update-feature-dialog"

import { diffForHuman } from "@/lib/utils"
import { forceDeletePlanFeatureAction, restorePlanFeatureAction, softDeletePlanFeatureAction } from "@/actions/plans"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Btn } from "@/components/common/button"
import { Trash, Undo } from "lucide-react"
import { DeleteModal } from "../ui/delete-modal"
import { RestoreModal } from "../ui/restore-modal"

import { PlanFeature } from "@prisma/client"

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
                  {!feature.deletedAt ? (
                    <DeleteModal deletedId={feature.id} softAction={softDeletePlanFeatureAction} forceAction={forceDeletePlanFeatureAction}>
                      <Btn asChild variant="destructive" icon={Trash} size="sm">
                        Delete
                      </Btn>
                    </DeleteModal>
                  ) : (
                    <RestoreModal deletedId={feature.id} action={restorePlanFeatureAction} asChild>
                      <Btn variant="blue" icon={Undo} size="sm">
                        Restore
                      </Btn>
                    </RestoreModal>
                  )}
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
