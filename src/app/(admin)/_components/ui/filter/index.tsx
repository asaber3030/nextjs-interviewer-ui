import { cn } from "@/lib/utils"
import { ClassValue } from "class-variance-authority/types"
import { SearchFilter } from "./search"
import { OrderBy, SearchParams } from "@/types"
import { OrderTypeFilter } from "./order-type"
import { OrderByFilter } from "./order-by"
import { LimitFilter } from "./limit"

type Props = {
  showSearch?: boolean
  showOrderBy?: boolean
  showOrderType?: boolean
  showLimit?: boolean
  parentClassName?: ClassValue
  searchParams: SearchParams
  orderByArray: OrderBy[]
}

export default function FilterAll({ showSearch = true, showOrderBy = true, showOrderType = true, showLimit = true, parentClassName, searchParams, orderByArray }: Props) {
  return (
    <div className={cn(parentClassName)}>
      {showSearch && <SearchFilter searchParams={searchParams} />}
      {showOrderType && <OrderTypeFilter searchParams={searchParams} />}
      {showOrderBy && <OrderByFilter orderByArray={orderByArray} searchParams={searchParams} />}
      {showLimit && <LimitFilter searchParams={searchParams} />}
    </div>
  )
}
