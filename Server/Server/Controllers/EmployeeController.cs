using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.API.Models;
using Server.Core.DTOs;
using Server.Core.Entities;
using Server.Core.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;

        public EmployeeController(IEmployeeService employeeService, IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }

        // GET: api/<EmployeeController>
        [HttpGet]
        public async Task<ActionResult<Employee[]>> Get()
        {
            var emp = await _employeeService.GetEmployeesAsync();
            var empDTO = emp.Select(e => _mapper.Map<EmployeeDTO>(e));
            return Ok(empDTO);
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var emp = await _employeeService.GetEmployeeByIdAsync(id);
            var empDTO = _mapper.Map<EmployeeDTO>(emp);
            if (empDTO == null)
                return NotFound();
            return Ok(empDTO);
        }

        // POST api/<EmployeeController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EmployeePostModel employee)
        {
            var empToAdd = _mapper.Map<Employee>(employee);
            var addedEmployee = await _employeeService.AddEmployeeAsync(empToAdd);
            var newEmployee = await _employeeService.GetEmployeeByIdAsync(addedEmployee.Id);
            var empDTO = _mapper.Map<EmployeeDTO>(newEmployee);
            return Ok(empDTO);
        }

        // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] EmployeePutModel employee)
        {
            var empToUpdate = _mapper.Map<Employee>(employee);
            var updatedEmp = await _employeeService.UpdateEmployeeAsync(id, empToUpdate);
            var newEmp = await _employeeService.GetEmployeeByIdAsync(updatedEmp.Id);
            var empDTO = _mapper.Map<EmployeeDTO>(newEmp);
            return Ok(empDTO);

        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            _employeeService.DeleteEmployeeAsync(id);
            return Ok();
        }
    }
}
