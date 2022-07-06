using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication4.Models
{
    public class Appointment
    {
        public int appointmentID { get; set; }
        public string doctorName { get; set; }
        public string patientName { get; set; }
        public string appointmentDate { get; set; }
    }
}