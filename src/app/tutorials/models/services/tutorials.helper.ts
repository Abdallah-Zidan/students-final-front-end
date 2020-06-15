import { Tag } from '../tag';

const getTags = (tagsArr: Array<string>) => {
  let newTagsArr: Array<Tag>;
  tagsArr.forEach((tag) => {
    newTagsArr.push(new Tag('-1', tag));
  });

  return newTagsArr;
};
export { getTags };
