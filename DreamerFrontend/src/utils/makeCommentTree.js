let flag = []

export const buildCommentTree = (commentList, parentId = null) => {
    const filteredComments = commentList.filter((comment) => comment.receiver_id === parentId);

    let result = []

    if (flag[parentId] && flag[parentId] == parentId) return
    flag[parentId] = parentId

    for (let i = 0; i < filteredComments.length; i++) {
        let commentItem = filteredComments[i]
        let subComments = buildCommentTree(commentList, commentItem.sender_id)

        result.push({
            ...commentItem,
            subComments: subComments !== undefined && subComments,
        })

    }

    return result
};
