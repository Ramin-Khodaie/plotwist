/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Plotwist
 * OpenAPI spec version: 0.1.0
 */
import {
  useQuery,
  useSuspenseQuery
} from '@tanstack/react-query'
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseQueryOptions,
  UseQueryResult,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult
} from '@tanstack/react-query'
import type {
  GetUserIdStats200,
  GetUserIdTotalHours200
} from './endpoints.schemas'
import { axiosInstance } from '../services/axios-instance';




/**
 * Get user stats
 */
export const getUserIdStats = (
    id: string,
 signal?: AbortSignal
) => {
      
      
      return axiosInstance<GetUserIdStats200>(
      {url: `/user/${id}/stats`, method: 'GET', signal
    },
      );
    }
  

export const getGetUserIdStatsQueryKey = (id: string,) => {
    return [`/user/${id}/stats`] as const;
    }

    
export const getGetUserIdStatsQueryOptions = <TData = Awaited<ReturnType<typeof getUserIdStats>>, TError = unknown>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserIdStats>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetUserIdStatsQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getUserIdStats>>> = ({ signal }) => getUserIdStats(id, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getUserIdStats>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetUserIdStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getUserIdStats>>>
export type GetUserIdStatsQueryError = unknown


export function useGetUserIdStats<TData = Awaited<ReturnType<typeof getUserIdStats>>, TError = unknown>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserIdStats>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUserIdStats>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetUserIdStats<TData = Awaited<ReturnType<typeof getUserIdStats>>, TError = unknown>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserIdStats>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUserIdStats>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetUserIdStats<TData = Awaited<ReturnType<typeof getUserIdStats>>, TError = unknown>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserIdStats>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useGetUserIdStats<TData = Awaited<ReturnType<typeof getUserIdStats>>, TError = unknown>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserIdStats>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetUserIdStatsQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getGetUserIdStatsSuspenseQueryOptions = <TData = Awaited<ReturnType<typeof getUserIdStats>>, TError = unknown>(id: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getUserIdStats>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetUserIdStatsQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getUserIdStats>>> = ({ signal }) => getUserIdStats(id, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseSuspenseQueryOptions<Awaited<ReturnType<typeof getUserIdStats>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetUserIdStatsSuspenseQueryResult = NonNullable<Awaited<ReturnType<typeof getUserIdStats>>>
export type GetUserIdStatsSuspenseQueryError = unknown


export function useGetUserIdStatsSuspense<TData = Awaited<ReturnType<typeof getUserIdStats>>, TError = unknown>(
 id: string, options: { query:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getUserIdStats>>, TError, TData>>, }

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetUserIdStatsSuspense<TData = Awaited<ReturnType<typeof getUserIdStats>>, TError = unknown>(
 id: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getUserIdStats>>, TError, TData>>, }

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetUserIdStatsSuspense<TData = Awaited<ReturnType<typeof getUserIdStats>>, TError = unknown>(
 id: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getUserIdStats>>, TError, TData>>, }

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useGetUserIdStatsSuspense<TData = Awaited<ReturnType<typeof getUserIdStats>>, TError = unknown>(
 id: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getUserIdStats>>, TError, TData>>, }

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetUserIdStatsSuspenseQueryOptions(id,options)

  const query = useSuspenseQuery(queryOptions) as  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * Get user total hours
 */
export const getUserIdTotalHours = (
    id: string,
 signal?: AbortSignal
) => {
      
      
      return axiosInstance<GetUserIdTotalHours200>(
      {url: `/user/${id}/total-hours`, method: 'GET', signal
    },
      );
    }
  

export const getGetUserIdTotalHoursQueryKey = (id: string,) => {
    return [`/user/${id}/total-hours`] as const;
    }

    
export const getGetUserIdTotalHoursQueryOptions = <TData = Awaited<ReturnType<typeof getUserIdTotalHours>>, TError = unknown>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserIdTotalHours>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetUserIdTotalHoursQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getUserIdTotalHours>>> = ({ signal }) => getUserIdTotalHours(id, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getUserIdTotalHours>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetUserIdTotalHoursQueryResult = NonNullable<Awaited<ReturnType<typeof getUserIdTotalHours>>>
export type GetUserIdTotalHoursQueryError = unknown


export function useGetUserIdTotalHours<TData = Awaited<ReturnType<typeof getUserIdTotalHours>>, TError = unknown>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserIdTotalHours>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUserIdTotalHours>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetUserIdTotalHours<TData = Awaited<ReturnType<typeof getUserIdTotalHours>>, TError = unknown>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserIdTotalHours>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUserIdTotalHours>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetUserIdTotalHours<TData = Awaited<ReturnType<typeof getUserIdTotalHours>>, TError = unknown>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserIdTotalHours>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useGetUserIdTotalHours<TData = Awaited<ReturnType<typeof getUserIdTotalHours>>, TError = unknown>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserIdTotalHours>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetUserIdTotalHoursQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getGetUserIdTotalHoursSuspenseQueryOptions = <TData = Awaited<ReturnType<typeof getUserIdTotalHours>>, TError = unknown>(id: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getUserIdTotalHours>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetUserIdTotalHoursQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getUserIdTotalHours>>> = ({ signal }) => getUserIdTotalHours(id, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseSuspenseQueryOptions<Awaited<ReturnType<typeof getUserIdTotalHours>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetUserIdTotalHoursSuspenseQueryResult = NonNullable<Awaited<ReturnType<typeof getUserIdTotalHours>>>
export type GetUserIdTotalHoursSuspenseQueryError = unknown


export function useGetUserIdTotalHoursSuspense<TData = Awaited<ReturnType<typeof getUserIdTotalHours>>, TError = unknown>(
 id: string, options: { query:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getUserIdTotalHours>>, TError, TData>>, }

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetUserIdTotalHoursSuspense<TData = Awaited<ReturnType<typeof getUserIdTotalHours>>, TError = unknown>(
 id: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getUserIdTotalHours>>, TError, TData>>, }

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetUserIdTotalHoursSuspense<TData = Awaited<ReturnType<typeof getUserIdTotalHours>>, TError = unknown>(
 id: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getUserIdTotalHours>>, TError, TData>>, }

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useGetUserIdTotalHoursSuspense<TData = Awaited<ReturnType<typeof getUserIdTotalHours>>, TError = unknown>(
 id: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getUserIdTotalHours>>, TError, TData>>, }

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetUserIdTotalHoursSuspenseQueryOptions(id,options)

  const query = useSuspenseQuery(queryOptions) as  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}


