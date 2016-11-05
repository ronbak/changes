from flask.ext.restful import reqparse

from changes.api.auth import get_current_user
from changes.api.base import APIView
from changes.config import db
from changes.models.build import Build
from changes.models.comment import Comment


class BuildCommentIndexAPIView(APIView):
    parser = reqparse.RequestParser()
    parser.add_argument('text', type=unicode, required=True)

    def get(self, build_id):
        build = Build.query.get(build_id)
        if build is None:
            return '', 404

        comments = list(Comment.query.filter(
            Comment.build == build,
        ).order_by(Comment.date_created.desc()))

        return self.respond(comments)

    def post(self, build_id):
        user = get_current_user()
        if user is None:
            return '', 401

        build = Build.query.get(build_id)
        if build is None:
            return '', 404

        args = self.parser.parse_args()

        # TODO(dcramer): ensure this comment wasn't just created
        comment = Comment(
            build=build,
            user=user,
            text=args.text.strip(),
        )
        db.session.add(comment)

        # TODO(dcramer): this should send out a notification about a new comment

        return self.respond(comment)
