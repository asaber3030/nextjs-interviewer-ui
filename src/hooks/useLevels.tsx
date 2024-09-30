import queryKeys from "@/lib/query-keys"

import { getLevelsOfCareer } from "@/actions/levels"
import { useQuery } from "@tanstack/react-query"

export function useLevelsOfCareer(careerId: number, search?: string) {
  const levelsQuery = useQuery({
    queryKey: queryKeys.careerLevelsWithSearch(careerId, search),
    queryFn: ({ queryKey }) => getLevelsOfCareer(careerId, queryKey[4] as string),
  })

  return {
    levelsLoading: levelsQuery.isLoading,
    levels: levelsQuery.data,
    levelsFetched: levelsQuery.isFetched,
    levelsError: levelsQuery.error,
    levelsFetching: levelsQuery.isFetching,
    refetchLevels: levelsQuery.refetch,
  }
}
