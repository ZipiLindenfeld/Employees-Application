using Microsoft.EntityFrameworkCore;
using Server.Core.Entities;
using Server.Core.Repositories;
using System.Data;


namespace Server.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;
        public EmployeeRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Employee>> GetEmployeesAsync()
        {
            return await _context.Employees.Where(e => e.Status).Include(e => e.Roles).ThenInclude(er => er.Role).ToListAsync();
        }
        public async Task<Employee> GetEmployeeByIdAsync(int id)
        {
            return await _context.Employees.Where(e => e.Id == id).Include(e => e.Roles).ThenInclude(er => er.Role).FirstAsync();
        }
        public async Task<Employee> AddEmployeeAsync(Employee employee)
        {
            var emp = await _context.Employees.FirstOrDefaultAsync(e => employee.Id == e.Id || employee.EmployeeIdentification == e.EmployeeIdentification);
            if (emp != null)
                return await UpdateEmployeeAsync(emp.Id, employee);
            employee.Roles = employee.Roles?.GroupBy(r => r.RoleId).Select(g => g.First()).ToList();
            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();
            return employee;
        }
        public async Task<Employee> UpdateEmployeeAsync(int id, Employee employee)
        {
            var emp = await _context.Employees.FirstOrDefaultAsync(e => employee.EmployeeIdentification == e.EmployeeIdentification);
            if (emp != null && emp.Id != id)
                throw new Exception("the identification number already exists!");
            Employee employee1 = await _context.Employees.Include(e => e.Roles).FirstOrDefaultAsync(e => e.Id == id);
            if (employee1 != null)
            {
                employee1.EmployeeIdentification = employee.EmployeeIdentification;
                employee1.FirstName = employee.FirstName;
                employee1.LastName = employee.LastName;
                employee1.StartDate = employee.StartDate;
                employee1.BirthDate = employee.BirthDate;
                employee1.Gender = employee.Gender;
                employee1.Status = employee.Status;
                employee1.Roles = employee.Roles?.GroupBy(r => r.RoleId).Select(g => g.First()).ToList();

            }
            else
                return await AddEmployeeAsync(employee);
            await _context.SaveChangesAsync();
            return employee1;

        }
        public void DeleteEmployeeAsync(int id)
        {
            var emp = _context.Employees.Find(id);
            if (emp != null)
            {
                emp.Status = false;
                _context.SaveChangesAsync();
            }

        }
    }
}
