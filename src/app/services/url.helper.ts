const replacePostsUrl = (endPoints: any, scope: string, scopeId: string) => {
  const placeHolders = ['{department_faculty}', '{faculty}'];
  const url: string =
    scope === '0' ? endPoints.departmentPosts : endPoints.facultyPosts;
  const placeHolder = scope === '0' ? placeHolders[0] : placeHolders[1];
  return url.replace(placeHolder, scopeId);
};

const replaceCommentsUrl = (
  endPoints: any,
  scope: string,
  scopeId: string,
  postId: string
) => {
  const url: string =
    replacePostsUrl(endPoints, scope, scopeId) + `/${postId}/comments`;

  return url;
};
export { replacePostsUrl, replaceCommentsUrl };
