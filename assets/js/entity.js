var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.createTemplateTagFirstArg = function(a) {
    return a.raw = a
};
$jscomp.createTemplateTagFirstArgWithRaw = function(a, b) {
    a.raw = b;
    return a
};
var identifier = document.getElementById("entity.identifier"),
    textureFile = document.getElementById("entity.texture_file"),
    modelFile = document.getElementById("entity.model_file"),
    isSpawnable = document.getElementById("entity.is_spawnable"),
    isSummonable = document.getElementById("entity.is_summonable"),
    isExperimental = document.getElementById("entity.is_experimental"),
    spawnEggPanel = document.getElementById("entity.spawn_egg.panel"),
    spawnEggOverlay = document.getElementById("entity.spawn_egg.overlay_color"),
    spawnEggBase =
    document.getElementById("entity.spawn_egg.base_color"),
    material = document.getElementById("entity.material"),
    baseBeh = document.getElementById("entity.basic_behaviors"),
    genButton = document.getElementById("entity.generate"),
    clearButton = document.getElementById("entity.clear"),
    spawnEggShow = document.getElementById("entity.spawn_egg.show_panel"),
    client = document.getElementsByClassName("client"),
    server = document.getElementsByClassName("server"),
    customBeh = document.getElementById("entity.custom_behaviors"),
    geoID =
    "",
    select = document.getElementById("pack.type"),
    reader = new FileReader,
    health = document.getElementById("behavior.health"),
    scale = document.getElementById("behavior.scale"),
    collisionH = document.getElementById("behavior.collision_box.height"),
    collisionW = document.getElementById("behavior.collision_box.width"),
    typeFamily = document.getElementById("behavior.type_family"),
    isImmune = document.getElementById("behavior.is_immune");
select.onchange = function() {
    "res" == select.value && "both" != select.value ? ($(".client").show(), $(".server").hide()) : ($(".client").hide(), $(".server").show());
    spawnEggShow.style.display = "none";
    "both" == select.value && ($(".client").show(), $(".server").show(), spawnEggShow.style.display = "block")
};

function main() {
    identifier.value ? ($("#entity").find("input, select, button").removeAttr("disabled"), spawnEggPanel.style.display = isSpawnable.checked ? "block" : "none") : ($("#entity").find("input, select, button").not("[name=identifier]").attr("disabled", "disabled"), spawnEggPanel.style.display = "none");
    // customBeh.style.display = baseBeh.checked ? "none" : "block"
}
main();

function getGeo() {
    0 < modelFile.files.length && (reader.addEventListener("load", function() {
        geoID = JSON.parse(reader.result)["minecraft:geometry"][0].description.identifier
    }), reader.readAsText(modelFile.files[0]))
}
genButton.onclick = function() {
    if (is_valid_identifier(identifier.value)) {
        var a = new uuid_generator_class,
            b = new JSZip;
        genManifest(a);
        var c = genManifest(a);
        a = c.rp;
        c = c.bp;
        var d = {
            format_version: "1.10.0",
            "minecraft:client_entity": {}
        };
        d["minecraft:client_entity"].description = {};
        d["minecraft:client_entity"].description.identifier = identifier.value;
        isSpawnable.checked && (d["minecraft:client_entity"].description.spawn_egg = {}, d["minecraft:client_entity"].description.spawn_egg.overlay_color = spawnEggOverlay.value,
            d["minecraft:client_entity"].description.spawn_egg.base_color = spawnEggBase.value);
        var e = textureFile.files;
        for (i = 0; i < e.length; i++) {
            var f = e[i].name.replace(".png", "");
            d["minecraft:client_entity"].description.textures = {};
            d["minecraft:client_entity"].description.textures["default"] = "textures/entity/" + f.toLowerCase();
            "res" !== select.value && "both" !== select.value || b.file("resource_pack/textures/entity/" + (f.toLowerCase() + ".png"), e[i])
        }
        d["minecraft:client_entity"].description.materials = {};
        d["minecraft:client_entity"].description.materials["default"] =
            material.value;
        0 < modelFile.files.length && (d["minecraft:client_entity"].description.geometry = {}, "res" !== select.value && "both" !== select.value || b.file("resource_pack/models/entity/" + modelFile.files[0].name, modelFile.files[0]), d["minecraft:client_entity"].description.geometry["default"] = geoID.toLowerCase());
        d["minecraft:client_entity"].description.render_controllers = [];
        d["minecraft:client_entity"].description.render_controllers[0] = "controller.render." + identifier.value.split(":")[1];
        e = {};
        "beh" !== select.value &&
            (0 < modelFile.files.length && 0 < textureFile.files.length ? genRenderControllers(e) : window.alert('Can\'t generate render controllers, missing either "geometry" or "texture"!'));
        f = {};
        baseBeh.checked ? genBehBasic(f) : genBehCustom(f);
        "res" !== select.value && "both" !== select.value || "beh" === select.value || (b.file("resource_pack/manifest.json", JSON.stringify(a, null, 2)), b.file("resource_pack/texts/en_US.lang", "entity." + identifier.value + ".name=" + identifier.value.split(":")[1]), b.file("resource_pack/entity/" + identifier.value.split(":")[1] +
            ".client.json", JSON.stringify(d, null, 2)), b.file("resource_pack/render_controllers/" + identifier.value.split(":")[1] + ".render_controllers.json", JSON.stringify(e, null, 2)));
        "beh" !== select.value && "both" !== select.value || "res" === select.value || (b.file("behavior_pack/manifest.json", JSON.stringify(c, null, 2)), b.file("behavior_pack/entities/" + identifier.value.split(":")[1] + ".json", JSON.stringify(f, null, 2)));
        b.generateAsync({
            type: "blob"
        }).then(function(g) {
            "beh" === select.value || "res" === select.value ? "res" === select.value ?
                saveAs(g, identifier.value.split(":")[1] + ".rp.mcpack") : saveAs(g, identifier.value.split(":")[1] + ".bp.mcpack") : "both" === select.value && saveAs(g, identifier.value.split(":")[1] + ".mcaddon")
        }, function(g) {
            console.log(g)
        })
    } else window.alert("Invalid Identifier!")
};

function genBehBasic(a) {
    a.format_version = "1.16.0";
    a["minecraft:entity"] = {};
    a["minecraft:entity"].description = {};
    a["minecraft:entity"].description.identifier = identifier.value;
    a["minecraft:entity"].description.is_spawnable = isSpawnable.checked;
    a["minecraft:entity"].description.is_summonable = isSummonable.checked;
    a["minecraft:entity"].description.is_experimental = isExperimental.checked;
    a["minecraft:entity"].components = {};
    a["minecraft:entity"].components["minecraft:health"] = {};
    a["minecraft:entity"].components["minecraft:health"].value =
        20;
    a["minecraft:entity"].components["minecraft:physics"] = {}
}

function genBehCustom(a) {
    a.format_version = "1.16.0";
    a["minecraft:entity"] = {};
    a["minecraft:entity"].description = {};
    a["minecraft:entity"].description.identifier = identifier.value;
    a["minecraft:entity"].description.is_spawnable = isSpawnable.checked;
    a["minecraft:entity"].description.is_summonable = isSummonable.checked;
    a["minecraft:entity"].description.is_experimental = isExperimental.checked;
    a["minecraft:entity"].components = {};
    health.value && !isImmune.checked && (a["minecraft:entity"].components["minecraft:health"] = {}, a["minecraft:entity"].components["minecraft:health"].value = parseFloat(health.value));
    scale.value && (a["minecraft:entity"].components["minecraft:scale"] = {}, a["minecraft:entity"].components["minecraft:scale"].value = parseFloat(scale.value));
    typeFamily.value && (a["minecraft:entity"].components["minecraft:type_family"] = {}, a["minecraft:entity"].components["minecraft:type_family"].family = [], a["minecraft:entity"].components["minecraft:type_family"].family = typeFamily.value.split(","));
    isImmune.checked && (a["minecraft:entity"].components["minecraft:damage_sensor"] = {}, a["minecraft:entity"].components["minecraft:damage_sensor"].triggers = {}, a["minecraft:entity"].components["minecraft:damage_sensor"].triggers.cause = "all", a["minecraft:entity"].components["minecraft:damage_sensor"].triggers.deals_damage = "false");
    collisionH.value && collisionW.value && (a["minecraft:entity"].components["minecraft:collision_box"] = {}, a["minecraft:entity"].components["minecraft:collision_box"].height = parseFloat(collisionH.value), a["minecraft:entity"].components["minecraft:collision_box"].width =
        parseFloat(collisionW.value))
}

function genRenderControllers(a) {
    a.format_version = "1.10.0";
    a.render_controllers = {};
    a.render_controllers["controller.render." + identifier.value.split(":")[1]] = {};
    a.render_controllers["controller.render." + identifier.value.split(":")[1]].geometry = "geometry.default";
    a.render_controllers["controller.render." + identifier.value.split(":")[1]].materials = [{}];
    a.render_controllers["controller.render." + identifier.value.split(":")[1]].materials[0]["*"] = "material.default";
    a.render_controllers["controller.render." + identifier.value.split(":")[1]].textures = [];
    a.render_controllers["controller.render." + identifier.value.split(":")[1]].textures[0] = "texture.default"
}

function genManifest(a) {
    var b = {},
        c = {};
    b.format_version = 2;
    c.format_version = 2;
    b.header = {};
    c.header = {};
    b.header.name = "BP";
    c.header.name = "RP";
    b.header.description = "BP Description";
    c.header.description = "RP Description";
    b.header.uuid = a.generate_uuid();
    c.header.uuid = a.generate_uuid();
    b.header.version = [0, 0, 1];
    c.header.version = [0, 0, 1];
    b.header.min_engine_version = [1, 16, 0];
    c.header.min_engine_version = [1, 16, 0];
    b.modules = [{}];
    c.modules = [{}];
    b.modules[0].type = "data";
    c.modules[0].type = "resources";
    b.modules[0].uuid =
        a.generate_uuid();
    c.modules[0].uuid = a.generate_uuid();
    b.modules[0].version = [0, 0, 1];
    c.modules[0].version = [0, 0, 1];
    "both" === select.value && (b.dependencies = [{}], c.dependencies = [{}], b.dependencies[0].uuid = c.header.uuid, c.dependencies[0].uuid = b.header.uuid, b.dependencies[0].version = c.header.version, c.dependencies[0].version = b.header.version);
    return {
        rp: c,
        bp: b
    }
}
var is_valid_identifier = verifyIdentifier();

function verifyIdentifier() {
    return function(a, b) {
        b = void 0 === b ? !1 : b;
        return a.match(":") ? (a.startsWith("minecraft") || a.startsWith("minecon")) && !1 === b ? !1 : /[!@#$%^&*()+\-=\[\]{};'"\\|,<>\/?]+/.test(a) ? !1 : a.startsWith(":") || a.startsWith(".") ? !1 : !0 : !1
    }
};