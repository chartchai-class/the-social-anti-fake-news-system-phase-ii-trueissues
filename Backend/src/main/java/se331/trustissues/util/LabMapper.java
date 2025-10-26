package se331.trustissues.util;

import org.mapstruct.*;
import org.mapstruct.factory.Mappers;
import se331.trustissues.dto.*;
import se331.trustissues.entity.*;

@Mapper(componentModel = "spring")
public interface LabMapper {
    LabMapper INSTANCE = Mappers.getMapper(LabMapper.class);

    @Mapping(target = "voteCount", expression = "java(news.getVotes()==null ? 0 : (int)news.getVotes().stream().filter(v -> !Boolean.TRUE.equals(v.getRemoved())).count())")
    NewsSummaryDto toNewsSummaryDto(News news);

    @Mapping(target = "voteCount", expression = "java(news.getVotes()==null ? 0 : (int)news.getVotes().stream().filter(v -> !Boolean.TRUE.equals(v.getRemoved())).count())")
    NewsDetailDto toNewsDetailDto(News news);

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "userName", expression = "java(vote.getUser()!=null ? vote.getUser().getName() : \"Anonymous\")")
    @Mapping(target = "imageUrl", source = "imageUrl")
    VoteDto toVoteDto(Vote vote);

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "userName", expression = "java(comment.getUser()!=null ? comment.getUser().getName() : \"Anonymous\")")
    @Mapping(target = "imageUrl", source = "imageUrl")
    CommentDto toCommentDto(Comment comment);

    @Mapping(target = "profileImageUrl", source = "profileImageUrl")
    UserDto toUserDto(User user);

}
