import { PostComment } from '../../shared/models/comment.model';
import { CommentReply } from '../../shared/models/reply.model';
import { ElementCreator } from '../../shared/models/creator.model';
import { Attachment } from '../../shared/models/attachment.model';
import { Post } from '../models/post.model';

/**
 * helper functions
 */

const getComments = (post) => {
  const comments = post.comments;
  const commentsArr: PostComment[] = [];
  comments.forEach((comment) => {
    commentsArr.push(
      new PostComment(
        comment.id,
        comment.body,
        getCreator(comment),
        getReplies(comment),
        comment.created_at_human
      )
    );
  });
  return commentsArr;
};
const getAttachments = (post) => {
  const files = post.files;
  const filesArr: Attachment[] = [];
  files.forEach((file) => {
    filesArr.push(
      new Attachment(
        file.id,
        file.url,
        file.mime,
        file.name ? file.name : 'download file'
      )
    );
  });
  return filesArr;
};
const getReplies = (comment) => {
  const replies = comment.replies;
  const repliesArr: CommentReply[] = [];
  replies.forEach((reply) => {
    repliesArr.push(
      new CommentReply(
        reply.id,
        reply.body,
        getCreator(reply),
        reply.created_at_human
      )
    );
  });
  return repliesArr;
};
const getCreator = (element) => {
  const creator = element.user;
  return new ElementCreator(creator.id, creator.name, creator.avatar);
};

const findInArray = (id, elements: any[]) => {
  let place = -1;
  const retElement: any = elements.find((post, index) => {
    place = index;
    return +post.id === +id;
  });
  return { element: retElement, index: place };
};
export { getComments, getAttachments, getReplies, getCreator, findInArray };
