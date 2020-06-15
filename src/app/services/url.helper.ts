const getResourceUrlGet = (
  baseUrl: string,
  resource: string,
  scope: string,
  scopeId: string,
  type: string = '',
  page
) => {
  let url: string = baseUrl.replace('{resource}', resource);
  if (scope) {
    url = url.replace('{scope}', scope);
  } else {
    url = url.replace('?group={scope}', '');
    url = url.replace('&type', '?type');
  }
  if (scopeId) {
    url = url.replace('{scope_id}', scopeId);
  } else {
    url = url.replace('&group_id={scope_id}', '');
  }
  if (type) {
    url = url.replace('{type}', type);
  } else {
    url = scope
      ? url.replace('&type={type}', '')
      : url.replace('?type={type}', '');
  }
  if (page) {
    url = url + `&page=${page}`;
  }
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
