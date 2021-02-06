import { TableAction } from '../../@types'
import { TABLE_INITIAL_DATA } from './types'

const data = [
    {
        number: 59,
        project: {
            id: '5e6a02c5661c851d202043ce',
            name: 'chatwork'
        },
        parentIssue: 53,
        tracker: 2,
        status: 3,
        author: {
            id: '5e69dea9726289204c943b74',
            userName: 'Au_121',
            name: 'Lữ Thị Tuyết Âu',
            avatar: '/content/upload/media/1584617345289/Kikyo-avatar-2.png'
        },
        assignee: {
            id: '5e69dea9726289204c943b74',
            name: 'Lữ Thị Tuyết Âu',
            userName: 'Au_121'
        },
        subject: 'subject-have-upload subject-have-upload',
        percentDone: 0,
        startDate: '2020-03-18T17:00:00.000Z',
        dueDate: '2020-04-30T17:00:00.000Z',
        createDate: 1584595878985,
        updateDate: 1584595878985,
        id: '5e7303a656937005a47d3f8a'
    },
    {
        number: 66,
        project: {
            id: '5e733a1b4e0c85001bb0e471',
            name: 'tygump94 là admin projects'
        },
        parentIssue: null,
        tracker: 1,
        status: 1,
        author: {
            id: '5e702929fe984a5b015a7cce',
            userName: 'tygump94',
            name: 'Ty Gump',
            avatar: '/content/upload/media/1585301034473/1585530977226_Kikyo-avatar-2.png'
        },
        assignee: {
            id: '5e72eac08742ba7ad9c2ff4a'
        },
        subject: 'assignee cho user k nằm trong projects',
        percentDone: 0,
        startDate: '2020-03-16T11:20:35.543Z',
        dueDate: '2020-03-19T11:20:39.063Z',
        createDate: 1584611877646,
        updateDate: 1584611877646,
        id: '5e7342254e0c85001bb0e47d'
    },
    {
        number: 75,
        project: {
            id: '5e7843aac88388001b4e66a4',
            name: 'oanh project 23'
        },
        parentIssue: null,
        tracker: 1,
        status: 1,
        author: {
            id: '5e702929fe984a5b015a7cce',
            userName: 'tygump94',
            name: 'Ty Gump',
            avatar: '/content/upload/media/1585301034473/1585530977226_Kikyo-avatar-2.png'
        },
        assignee: {
            id: '5e78437cc88388001b4e66a3'
        },
        subject: 'test filePath',
        percentDone: 0,
        startDate: '2020-03-15T17:00:00.000Z',
        dueDate: '2020-03-16T17:00:00.000Z',
        createDate: 1584940049339,
        updateDate: 1584940818981,
        id: '5e784411c88388001b4e66a6'
    }
]

let _dispatch: React.Dispatch<TableAction>
let _baseAPI: string

export function doFetchData(baseAPI: string, dispatch: React.Dispatch<TableAction>) {
    _baseAPI = baseAPI
    _dispatch = dispatch
    return new Promise((resolve) => {
        setTimeout(async () => {
            resolve(dispatch({ type: TABLE_INITIAL_DATA, payload: data }))
        }, 1000) // indicating pending time for API requesting
    })
}

export function doSort(key: string, sort: 'ASC' | 'DESC' | null) {
    console.log('key', key, sort)
    // return new Promise((resolve) => {
    //     setTimeout(async () => {
    //         resolve(dispatch({ type: TABLE_INITIAL_DATA, payload: data }))
    //     }, 1000) // indicating pending time for API requesting
    // })
}
