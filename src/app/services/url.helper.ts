const getResourceUrlGet = (
  baseUrl: string,
  resource: string,
  scope: string,
  scopeId: string,
  type: string = ''
) => {
  const url: string = baseUrl
    .replace('{resource}', resource)
    .replace('{scope}', scope)
    .replace('{scope_id}', scopeId ? scopeId : '-1')
    .replace('{type}', type);
  console.log(url);

  return url;
};
const getResourcesUrl = (
  baseUrl: string,
  resource: string,
  resourceId: string = null
) => {
  const url: string = baseUrl.replace('{resource}', resource);
  return resourceId ? url + `/${resourceId}` : url;
};

const getCommentsUrl = (
  baseUrl: string,
  resource: string,
  resourceId: string,
  commentId: string = null
) => {
  const url: string = baseUrl
    .replace('{resource}', resource)
    .replace('{resource_id}', resourceId);

  return commentId ? url + `/${commentId}` : url;
};
const getRepliesUrl = (
  baseUrl: string,
  commentId: string,
  replyId: string = null
) => {
  const url: string = baseUrl.replace('{comment_id}', commentId);

  return replyId ? url + `/${replyId}` : url;
};

export { getResourcesUrl, getCommentsUrl, getResourceUrlGet, getRepliesUrl };
