USE [Trainsquare]
GO
/****** Object:  StoredProcedure [dbo].[LessonDuration_SelectAll]    Script Date: 4/30/2022 12:41:54 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER proc [dbo].[LessonDuration_SelectAll]

as

/*

 Execute dbo.LessonDuration_SelectAll

*/

BEGIN

Select Id, Name
from dbo.LessonDuration


END