class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
        <div class="container">
          <div class="row">
            <div class="col-4">
            <div class="card m-4 d-flex" style="width: 320px;">
              <img src="/image/${this.image}" class="card-img-top" width="200px" alt="${this.manufacture}">
              <div class="card-body">
                <p class="card-text">${this.type}</p>
                <h5 class="card-title">Rp. ${this.rentPerDay} / hari</h5>
                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p class="card-text"><i class="bi bi-people me-3"></i>${this.capacity} Orang</p>
                <p class="card-text"><i class="bi bi-gear me-3"></i>${this.transmission}</p>
                <p class="card-text"><i class="bi bi-calendar me-3"></i>Tahun ${this.year}</p>
                <a href="" class="btn btn-success w-100">Pilih Mobil</a>
              </div>
            </div>
          </div>
          </div>  
        </div>
      `;
  }
}

module.exports = Car