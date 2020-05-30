import { PostComment } from '../models/comment.model';
import { CommentReply } from '../models/reply.model';
import { ElementCreator } from '../models/creator.model';
import { Attachment } from '../models/attachment.model';
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
        getReplies(comment)
      )
    );
  });
  return commentsArr;
};
const getAttachments = (post) => {
  const files = post.files;
  const filesArr: Attachment[] = [];
  files.forEach((file) => {
    filesArr.push(new Attachment(file.id, file.url, file.mime));
  });
  return filesArr;
};
const getReplies = (comment) => {
  const replies = comment.replies;
  const repliesArr: CommentReply[] = [];
  replies.forEach((reply) => {
    repliesArr.push(
      new CommentReply(reply.id, reply.body, getCreator(comment))
    );
  });
  return repliesArr;
};
const getCreator = (element) => {
  const creator = element.user;
  return new ElementCreator(creator.id, creator.name, creator.avatar);
};

const findPostInArray = (id, posts: Post[]) => {
  let place = -1;
  const postElement: Post = posts.find((post, index) => {
    place = index;
    return +post.id === +id;
  });
  return { post: postElement, index: place };
};
export { getComments, getAttachments, getReplies, getCreator, findPostInArray };
