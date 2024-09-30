import queryKeys from "@/lib/query-keys"

import { useQuery } from "@tanstack/react-query"
import { getCareers } from "@/actions/careers"

export function useCareers(search?: string) {
  const careersQuery = useQuery({
    queryKey: queryKeys.careers(search),
    queryFn: ({ queryKey }) => getCareers(queryKey[2] as string),
  })

  return {
    careers: careersQuery.data,
    careersLoading: careersQuery.isLoading,
    careersFetched: careersQuery.isFetched,
    careersError: careersQuery.error,
    careersFetching: careersQuery.isFetching,
    refetchCareers: careersQuery.refetch,
  }
}
