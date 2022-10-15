namespace Triperis.Models
{
    public class CarCreateDto
    {
        public string Marke { get; set; }
        public string Modelis { get; set; }
        public int Metai { get; set; }
        public string KuroTipas { get; set; }
        public string KebuloTipas { get; set; }
        public double VariklioTuris { get; set; }
        public int Galia { get; set; }
        public int Rida { get; set; }
        public bool Defektai { get; set; }
        public string Spalva { get; set; }
        public string PavaruDeze { get; set; }
        public string Aprasymas { get; set; }
        public int Kaina { get; set; }
        public string Vin { get; set; }
        public int UserId { get; set; }
        public bool Parduotas { get; set; }
    }
}
