namespace ThoiKhoaBieu.Migrations.SchoolDbContext
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialDatabaseCreation : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Class",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        TimeCount = c.Int(nullable: false),
                        SubjectID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Subject", t => t.SubjectID, cascadeDelete: true)
                .Index(t => t.SubjectID);
            
            CreateTable(
                "dbo.Subject",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        RequireProjector = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Room",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Capacity = c.Int(nullable: false),
                        HasProjector = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Schedule",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        DayOfWeek = c.Int(nullable: false),
                        PartOfDay = c.Int(nullable: false),
                        TimeStart = c.Int(nullable: false),
                        TimeEnd = c.Int(nullable: false),
                        RoomID = c.Int(nullable: false),
                        ClassID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Class", t => t.ClassID, cascadeDelete: true)
                .ForeignKey("dbo.Room", t => t.RoomID, cascadeDelete: true)
                .Index(t => t.RoomID)
                .Index(t => t.ClassID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Schedule", "RoomID", "dbo.Room");
            DropForeignKey("dbo.Schedule", "ClassID", "dbo.Class");
            DropForeignKey("dbo.Class", "SubjectID", "dbo.Subject");
            DropIndex("dbo.Schedule", new[] { "ClassID" });
            DropIndex("dbo.Schedule", new[] { "RoomID" });
            DropIndex("dbo.Class", new[] { "SubjectID" });
            DropTable("dbo.Schedule");
            DropTable("dbo.Room");
            DropTable("dbo.Subject");
            DropTable("dbo.Class");
        }
    }
}
