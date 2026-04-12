using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UrbanPulse.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddUserRatingCounts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "HelpfulCount",
                table: "Users",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "NotHelpfulCount",
                table: "Users",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HelpfulCount",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "NotHelpfulCount",
                table: "Users");
        }
    }
}
