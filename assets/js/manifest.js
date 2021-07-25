function writeManifest() {
    var e = document.getElementById("pack.type"),
        q = document.getElementById("dp.element"),
        w = document.getElementById("pack.element"),
        u = document.getElementById("pack.name"),
        h = document.getElementById("pack.description"),
        r = document.getElementById("pack.min_engine_version"),
        A = document.getElementById("pack.metadata.checkbox"),
        x = document.getElementById("pack.author.element"),
        y = document.getElementById("pack.author.name"),
        l = document.getElementById("pack.author.url"),
        m = document.getElementById("pack.code"),
        b = document.getElementById("pack.copy"),
        d = document.getElementById("pack.download"),
        n = document.getElementById("rp.enable.ui.checkbox"),
        a = document.getElementById("bp.enable.scripts.checkbox"),
        p = document.getElementById("pack.gametest.checkbox"),
        z = document.getElementById("pack.gametest.element"),
        v = document.getElementById("pack.gametest.file"),
        k = document.getElementById("pack.icon"),
        t = document.getElementById("pack.downloadA"),
        g = new JSZip;
    t.onclick = function () {
        g.generateAsync({
            type: "blob"
        }).then(function (f) {
            "dep" ===
                e.value ? saveAs(f, document.getElementById("rp.dep.name").value + ".mcaddon") : saveAs(f, u.value + ".mcpack")
        })
    };
    "dep" === e.value ? (t = !0, w.style.display = "none") : (t = !1, w.style.display = "block");
    "skin_pack" === e.value ? (h.disabled = !0, r.disabled = !0) : (h.disabled = !1, r.disabled = !1);
    !1 === t ? (q.style.display = "none", n = new uuid_generator_class, a = {
        format_version: 2,
        header: {}
    }, "" !== u.value && (a.header.name = u.value), "" !== h.value && "skin_pack" !== e.value && (a.header.description = h.value), a.header.uuid = n.generate_uuid(), a.header.version = [1, 0, 0], a.modules = [], a.modules[0] = {}, a.modules[0].type = "scripts" == e.value ? "data" : e.value, a.modules[0].uuid = n.generate_uuid(), a.modules[0].version = [1, 0, 0], "scripts" === e.value && (a.modules[1] = {}, "" !== h.value && (a.modules[1].description = h.value), a.modules[1].type = "client_data", a.modules[1].uuid = n.generate_uuid(), a.modules[1].version = [1, 0, 0]), "none" !== r.value && "skin_pack" !== e.value && (a.header.min_engine_version = JSON.parse(r.value)), A.checked ? (a.metadata = {}, x.style.display = "block", "" !== y.value && (a.metadata.authors = [], h = y.value, a.metadata.authors = h.split(",").map(function (f) {
        return f.trim()
    })), "" !== l.value && (a.metadata.url = l.value)) : x.style.display = "none", "data" == e.value ? p.disabled = !1 : "scripts" == e.value ? p.disabled = !1 : (p.disabled = !0, p.checked && (p.checked = !1)), p.checked ? (z.style.display = "block", a.dependencies = [], a.dependencies[0] = {}, a.dependencies[0].description = "Minecraft module, required to use the Minecraft module", a.dependencies[0].uuid = "b26a4d4c-afdf-4690-88f8-931846312678", a.dependencies[0].version = [0, 1,
        0
    ], a.dependencies[1] = {}, a.dependencies[1].description = "GameTest module, required to use the GameTest module", a.dependencies[1].uuid = "6f4b6893-1bb6-42fd-b458-7fa3d0c89616", a.dependencies[1].version = [0, 1, 0], "" !== v.value && ("scripts" == e.value ? (a.modules[2] = {}, a.modules[2].type = "javascript", a.modules[2].uuid = n.generate_uuid(), a.modules[2].version = [1, 0, 0], a.modules[2].entry = "scripts/" + v.value) : (a.modules[1] = {}, a.modules[1].type = "javascript", a.modules[1].uuid = n.generate_uuid(), a.modules[1].version = [1, 0,
        0
    ], a.modules[1].entry = "scripts/" + v.value))) : z.style.display = "none", m.value = JSON.stringify(a, null, 2), b.onclick = function () {
        m.select();
        m.setSelectionRange(0, m.value.length);
        document.execCommand("copy")
    }, d.onclick = function () {
        var f = new Blob([m.value], {
            type: "text/plain"
        }),
            c = document.createElement("a");
        c.download = "manifest.json";
        c.innerHTML = "Save";
        null != window.webkitURL ? c.href = window.webkitURL.createObjectURL(f) : (c.href = window.URL.createObjectURL(f), c.onclick = destroyClickedElement, c.style.display = "none",
            document.body.appendChild(c));
        c.click()
    }) : (l = new uuid_generator_class, q.style.display = "block", b = {
        format_version: 2,
        header: {},
        modules: [],
        dependencies: [{}]
    }, "" !== document.getElementById("bp.dep.name").value && (b.header.name = document.getElementById("bp.dep.name").value), "" !== document.getElementById("bp.dep.description").value && (b.header.description = document.getElementById("bp.dep.description").value), b.header.uuid = l.generate_uuid(), b.header.version = [1, 0, 0], "none" !== document.getElementById("bp.dep.min_engine_version").value &&
        (b.header.min_engine_version = JSON.parse(document.getElementById("bp.dep.min_engine_version").value)), b.modules[0] = {}, b.modules[0].type = "data", b.modules[0].uuid = l.generate_uuid(), b.modules[0].version = [1, 0, 0], a.checked ? (n.disabled = !1, b.modules[1] = {}, b.modules[1].type = "client_data", b.modules[1].uuid = l.generate_uuid(), b.modules[1].version = [1, 0, 0]) : n.disabled = !0, document.getElementById("bp.dep.metadata.checkbox").checked ? (b.metadata = {}, document.getElementById("bp.dep.author.element").style.display = "block",
            "" !== document.getElementById("bp.dep.author.name").value && (b.metadata.authors = [], h = document.getElementById("bp.dep.author.name").value, b.metadata.authors = h.split(",").map(function (f) {
                return f.trim()
            })), "" !== document.getElementById("bp.dep.author.url").value && (b.metadata.url = document.getElementById("bp.dep.author.url").value)) : document.getElementById("bp.dep.author.element").style.display = "none", document.getElementById("bp.dep.copy").onclick = function () {
                document.getElementById("bp.dep.code").select();
                document.getElementById("bp.dep.code").setSelectionRange(0, document.getElementById("bp.dep.code").value.length);
                document.execCommand("copy")
            }, document.getElementById("bp.dep.download").onclick = function () {
                var f = document.getElementById("bp.dep.code").value;
                f = new Blob([f], {
                    type: "text/plain"
                });
                var c = document.createElement("a");
                c.download = "manifest.json";
                c.innerHTML = "Save";
                null != window.webkitURL ? c.href = window.webkitURL.createObjectURL(f) : (c.href = window.URL.createObjectURL(f), c.onclick = destroyClickedElement,
                    c.style.display = "none", document.body.appendChild(c));
                c.click()
            }, d = {
                format_version: 2,
                header: {},
                modules: [{}],
                dependencies: [{}]
            }, "" !== document.getElementById("rp.dep.name").value && (d.header.name = document.getElementById("rp.dep.name").value), "" !== document.getElementById("rp.dep.description").value && (d.header.description = document.getElementById("rp.dep.description").value), d.header.uuid = l.generate_uuid(), d.header.version = [1, 0, 0], "none" !== document.getElementById("rp.dep.min_engine_version").value && (d.header.min_engine_version =
                JSON.parse(document.getElementById("rp.dep.min_engine_version").value)), d.modules[0].type = "resources", d.modules[0].uuid = l.generate_uuid(), d.modules[0].version = [1, 0, 0], document.getElementById("rp.dep.metadata.checkbox").checked ? (d.metadata = {}, document.getElementById("rp.dep.author.element").style.display = "block", "" !== document.getElementById("rp.dep.author.name").value && (d.metadata.authors = [], h = document.getElementById("rp.dep.author.name").value, d.metadata.authors = h.split(",").map(function (f) {
                    return f.trim()
                })),
                    "" !== document.getElementById("rp.dep.author.url").value && (d.metadata.url = document.getElementById("rp.dep.author.url").value)) : document.getElementById("rp.dep.author.element").style.display = "none", document.getElementById("rp.dep.copy").onclick = function () {
                        document.getElementById("rp.dep.code").select();
                        document.getElementById("rp.dep.code").setSelectionRange(0, document.getElementById("rp.dep.code").value.length);
                        document.execCommand("copy")
                    }, document.getElementById("rp.dep.download").onclick = function () {
                        var f =
                            document.getElementById("rp.dep.code").value;
                        f = new Blob([f], {
                            type: "text/plain"
                        });
                        var c = document.createElement("a");
                        c.download = "manifest.json";
                        c.innerHTML = "Save";
                        null != window.webkitURL ? c.href = window.webkitURL.createObjectURL(f) : (c.href = window.URL.createObjectURL(f), c.onclick = destroyClickedElement, c.style.display = "none", document.body.appendChild(c));
                        c.click()
                    }, b.dependencies[0].uuid = d.header.uuid, b.dependencies[0].version = d.header.version, d.dependencies[0].uuid = b.header.uuid, d.dependencies[0].version =
        d.header.version, n.checked && a.checked && (d.capabilities = [], d.capabilities[0] = "experimental_custom_ui"), document.getElementById("bp.gametest.checkbox").checked ? (document.getElementById("bp.gametest.element").style.display = "block", b.dependencies[1] = {}, b.dependencies[1].description = "Minecraft module, required to use the Minecraft module", b.dependencies[1].uuid = "b26a4d4c-afdf-4690-88f8-931846312678", b.dependencies[1].version = [0, 1, 0], b.dependencies[2] = {}, b.dependencies[2].description = "GameTest module, required to use the GameTest module",
            b.dependencies[2].uuid = "6f4b6893-1bb6-42fd-b458-7fa3d0c89616", b.dependencies[2].version = [0, 1, 0], a.checked ? (b.modules[2] = {}, b.modules[2].type = "javascript", b.modules[2].uuid = l.generate_uuid(), b.modules[2].version = [1, 0, 0], b.modules[2].entry = "scripts/" + document.getElementById("bp.gametest.file").value) : (b.modules[1] = {}, b.modules[1].type = "javascript", b.modules[1].uuid = l.generate_uuid(), b.modules[1].version = [1, 0, 0], b.modules[1].entry = "scripts/" + document.getElementById("bp.gametest.file").value)) : document.getElementById("bp.gametest.element").style.display =
        "none", document.getElementById("bp.dep.code").value = JSON.stringify(b, null, 2), document.getElementById("rp.dep.code").value = JSON.stringify(d, null, 2));
    "resources" === e.value ? (0 < k.files.length && g.file("rp/pack_icon.png", k.files[0]), g.file("rp/manifest.json", m.value)) : "data" === e.value ? (0 < k.files.length && g.file("bp/pack_icon.png", k.files[0]), g.file("bp/manifest.json", m.value)) : "skin_pack" === e.value ? (0 < k.files.length && g.file("rp/pack_icon.png", k.files[0]), g.file("rp/manifest.json", m.value)) : "scripts" === e.value ?
        (0 < k.files.length && g.file("rp/pack_icon.png", k.files[0]), g.file("rp/manifest.json", m.value)) : (0 < k.files.length && (g.file("rp/pack_icon.png", k.files[0]), g.file("bp/pack_icon.png", k.files[0])), g.file("rp/manifest.json", document.getElementById("rp.dep.code").value), g.file("bp/manifest.json", document.getElementById("bp.dep.code").value))
}
writeManifest();