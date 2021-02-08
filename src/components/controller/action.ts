import { History } from 'history'
import { Observable, Subscription } from 'rxjs'
import { AjaxResponse } from 'rxjs/ajax'
import { AjaxObservable } from 'rxjs/internal/observable/dom/AjaxObservable'
import { TableAction } from '../../@types'
import { TABLE_DATA, TABLE_LOADING } from './types'

enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

type RequestOptions = { url: string; method?: HttpMethod; params?: string; bearerToken?: string }
function createRequest(options: RequestOptions): Observable<AjaxResponse> {
    const { url, method = HttpMethod.GET, params, bearerToken } = options
    return AjaxObservable.create({
        url: `${url}?${params}`,
        headers: { Authorization: `Bearer ${bearerToken}`, 'Content-Type': 'application/json' },
        timeout: 10000,
        method,
        body: params
    })
}

let _history: History
let _dispatch: React.Dispatch<TableAction>
let _baseAPI: string
let _bearerToken: string
let _subscription: Subscription

type Search = Record<string, string | number | boolean | undefined>
type ActionOptions = { baseAPI: string; bearerToken?: string; history: History; dispatch: React.Dispatch<TableAction> }

function buildQueryString(search: Search): string {
    const searchParams = new URLSearchParams(location.search)
    Object.keys(search).forEach((key) => {
        const value = search[key]
        if (!search[key] || (Array.isArray(value) && !value.length)) {
            searchParams.delete(key)
        } else {
            searchParams.set(key, `${search[key]}`)
        }
    })
    return searchParams.toString()
}

export function doFetchData({ baseAPI, bearerToken, history, dispatch }: ActionOptions) {
    doCancelRequest()

    _baseAPI = baseAPI
    _bearerToken = bearerToken
    _history = history
    _dispatch = dispatch
    _subscription = createRequest({ url: baseAPI, bearerToken, params: buildQueryString({}) }).subscribe(
        (response: AjaxResponse) => {
            dispatch({ type: TABLE_DATA, payload: response.response })
        }
    )
}

export function doSort(key: string, sort: 'ASC' | 'DESC' | null) {
    const search = buildQueryString({ sortKey: sort && key, sortOrder: sort })
    doCancelRequest()

    _dispatch({ type: TABLE_LOADING })
    _history?.replace({ pathname: location.pathname, search })

    _subscription = createRequest({ url: _baseAPI, bearerToken: _bearerToken, params: search }).subscribe(
        (response: AjaxResponse) => {
            _dispatch({ type: TABLE_DATA, payload: response.response })
        }
    )
}

export function doPaging(key: string, sort: 'ASC' | 'DESC' | undefined) {
    console.log('key', key, sort)
    // return new Promise((resolve) => {
    //     setTimeout(async () => {
    //         resolve(dispatch({ type: TABLE_INITIAL_DATA, payload: data }))
    //     }, 1000) // indicating pending time for API requesting
    // })
}

export function doFilter(key: string, value: string | number | boolean | undefined) {
    console.log('key', key, value)
    // return new Promise((resolve) => {
    //     setTimeout(async () => {
    //         resolve(dispatch({ type: TABLE_INITIAL_DATA, payload: data }))
    //     }, 1000) // indicating pending time for API requesting
    // })
}

export function doSearch(key: string, value: string) {
    console.log('key', key, value)
    // return new Promise((resolve) => {
    //     setTimeout(async () => {
    //         resolve(dispatch({ type: TABLE_INITIAL_DATA, payload: data }))
    //     }, 1000) // indicating pending time for API requesting
    // })
}

export function doCancelRequest() {
    if (_subscription && !_subscription.closed) {
        _subscription.unsubscribe()
    }
}
