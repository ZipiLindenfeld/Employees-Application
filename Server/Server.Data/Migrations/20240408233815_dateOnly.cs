using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class dateOnly : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateOnly>(
                name: "StartDate",
                table: "Employees",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "DateOnly2");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "BirthDate",
                table: "Employees",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "DateOnly2");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "StartDate",
                table: "EmployeeRole",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "DateOnly2");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateOnly>(
                name: "StartDate",
                table: "Employees",
                type: "DateOnly2",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "BirthDate",
                table: "Employees",
                type: "DateOnly2",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "StartDate",
                table: "EmployeeRole",
                type: "DateOnly2",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");
        }
    }
}
