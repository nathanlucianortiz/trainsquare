USE [Trainsquare]
GO
/****** Object:  StoredProcedure [dbo].[Lessons_Delete_ById]    Script Date: 4/30/2022 12:43:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Nathan Ortiz
-- Create date: 03/24/2022
-- Description: Deletes a single record by Id 
--				from the Lessons table.
-- Code Reviewer: Abel Amezcua

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer:
-- Note:
-- =============================================

ALTER proc [dbo].[Lessons_Delete_ById] @Id int

/*---------Test Code------------

	Declare @Id int = 19;
	
	EXECUTE [dbo].[Lessons_Select_ById] @Id

	EXECUTE [dbo].[Lessons_Delete_ById] @Id

	EXECUTE [dbo].[Lessons_Select_ById] @Id

*/

as

BEGIN


DELETE FROM [dbo].[Lessons]
      WHERE Id = @Id


END



