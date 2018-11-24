/**
 * @author
 * @file 关于标签的controller
 */

import Tag from '../models/TagModel'

class TagsController {
    async updateTag(ctx) {
        ctx.body = await Tag.updateTag(ctx.params.id, ctx.request.body.tags)
    }
    async getTag(ctx){
        ctx.body = await Tag.getTag()
    }
}

export default new TagsController()
