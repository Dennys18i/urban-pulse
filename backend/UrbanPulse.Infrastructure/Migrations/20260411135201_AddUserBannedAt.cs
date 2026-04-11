using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UrbanPulse.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddUserBannedAt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "BannedAt",
                table: "Users",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BannedAt",
                table: "Users");
        }
    }
}
