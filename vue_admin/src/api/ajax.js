import request from '@/utils/request'

export function ajaxPost(url, params) {
    return request({
        url,
        method: 'post',
        params: params || {}
    })
}

