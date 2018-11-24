/**
 * @author
 * @file tags的model
 */

import query from '../utils/query'
import escape from '../utils/escape'

class Tags {
    async updateTag(id, tags) {
        return await query(escape`UPDATE ARTICLE SET tags=${tags} WHERE id=${id}`)
    }
    async getTag(){
        return await query(escape`SELECT TAGS FROM ARTICLE ORDER BY createTime DESC`)
    }
}

export default new Tags()
