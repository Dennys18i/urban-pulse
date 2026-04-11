using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UrbanPulse.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddAdminTaskStats : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TasksBanned",
                table: "Users",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TasksDismissed",
                table: "Users",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TasksDuplicatesMerged",
                table: "Users",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TasksPostsDeleted",
                table: "Users",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TasksBanned",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "TasksDismissed",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "TasksDuplicatesMerged",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "TasksPostsDeleted",
                table: "Users");
        }
    }
}
