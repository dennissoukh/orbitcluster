const { BaseCommand } = require('../build/Neuron');
const stars = require('../../data/hygdata_v3.json');

class ProcessStarData extends BaseCommand {
    /**
     * The name and signature of the console command.
     */
    commandName = 'download:stars';

    /**
      * The console command description.
      */
    description = 'Process the HYG star database';

    /**
     * Execute the console command.
     */
    async run(app) {
        const { db } = app.mongo;

        try {
            const collection = db.collection('hyg-star');

            await collection.deleteMany({});

            for (let i = 0; i < stars.length; i += 1) {
                const star = stars[i];

                await collection.insertOne({
                    id: Number.parseInt(star.id),
                    hip: Number.parseInt(star.hip),
                    hd: Number.parseInt(star.hd),
                    hr: Number.parseInt(star.hr),
                    gl: star.gl ? star.gl : null,
                    bf: star.bf ? star.bf : null,
                    proper: star.proper ? star.proper : null,
                    ra: Number.parseFloat(star.ra),
                    dec: Number.parseFloat(star.dec),
                    dist: Number.parseFloat(star.dist),
                    pmra: Number.parseFloat(star.pmra),
                    pmdec: Number.parseFloat(star.pmdec),
                    rv: Number.parseFloat(star.rv),
                    mag: Number.parseFloat(star.mag),
                    absmag: Number.parseFloat(star.absmag),
                    spect: star.spect ? star.spect : null,
                    ci: Number.parseFloat(star.ci),
                    x: Number.parseFloat(star.x),
                    y: Number.parseFloat(star.y),
                    z: Number.parseFloat(star.z),
                    vx: Number.parseFloat(star.vx),
                    vy: Number.parseFloat(star.vy),
                    vz: Number.parseFloat(star.vz),
                    rarad: Number.parseFloat(star.rarad),
                    decrad: Number.parseFloat(star.decrad),
                    pmrarad: Number.parseFloat(star.pmrarad),
                    pmdecrad: Number.parseFloat(star.pmdecrad),
                    bayer: star.bayer ? star.bayer : null,
                    flam: Number.parseInt(star.flam),
                    con: star.con ? star.con : null,
                    comp: Number.parseInt(star.comp),
                    comp_primary: Number.parseInt(star.comp_primary),
                    base: star.base ? star.base : null,
                    lum: Number.parseFloat(star.lum),
                    var: star.var ? star.var : null,
                    var_min: Number.parseFloat(star.var_min),
                    var_max: Number.parseFloat(star.var_max),
                });
            }
        } catch (error) {
            console.log(error);
            throw error;
        }

        console.log(
            `> HYG star database processed, ${stars.length} stars done`,
        )
    }
}

module.exports = ProcessStarData;
