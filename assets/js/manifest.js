var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.createTemplateTagFirstArg = function(e) {
    return e.raw = e
};
$jscomp.createTemplateTagFirstArgWithRaw = function(e, c) {
    e.raw = c;
    return e
};

function writeManifest() {
    var e = document.getElementById("pack.type"),
        c = document.getElementById("dp.element"),
        h = document.getElementById("pack.element"),
        n = document.getElementById("pack.name"),
        l = document.getElementById("pack.description"),
        m = document.getElementById("pack.min_engine_version"),
        t = document.getElementById("pack.metadata.checkbox"),
        p = document.getElementById("pack.author.element"),
        q = document.getElementById("pack.author.name"),
        g = document.getElementById("pack.author.url"),
        k = document.getElementById("pack.code"),
        d = document.getElementById("pack.copy"),
        b = document.getElementById("pack.download");
    if ("dep" === e.value) {
        var r = !0;
        h.style.display = "none"
    } else r = !1, h.style.display = "block";
    "skin_pack" === e.value ? (l.disabled = !0, m.disabled = !0) : (l.disabled = !1, m.disabled = !1);
    !1 === r ? (c.style.display = "none", h = new uuid_generator_class, c = {
            format_version: 2,
            header: {}
        }, "" !== n.value && (c.header.name = n.value), "" !== l.value && "skin_pack" !== e.value && (c.header.description = l.value), c.header.uuid = h.generate_uuid(), c.header.version = [0, 0, 1],
        c.modules = [{}], c.modules[0].type = e.value, c.modules[0].uuid = h.generate_uuid(), c.modules[0].version = [0, 0, 1], "none" !== m.value && "skin_pack" !== e.value && (c.header.min_engine_version = JSON.parse(m.value)), t.checked ? (c.metadata = {}, p.style.display = "block", "" !== q.value && (c.metadata.authors = [], e = q.value, c.metadata.authors = e.split(",")), "" !== g.value && (c.metadata.url = g.value)) : p.style.display = "none", k.value = JSON.stringify(c, null, 2), d.onclick = function() {
            k.select();
            k.setSelectionRange(0, k.value.length);
            document.execCommand("copy")
        },
        b.onclick = function() {
            var f = new Blob([k.value], {
                    type: "text/plain"
                }),
                a = document.createElement("a");
            a.download = "manifest.json";
            a.innerHTML = "Save";
            null != window.webkitURL ? a.href = window.webkitURL.createObjectURL(f) : (a.href = window.URL.createObjectURL(f), a.onclick = destroyClickedElement, a.style.display = "none", document.body.appendChild(a));
            a.click()
        }) : (g = new uuid_generator_class, c.style.display = "block", d = {
            format_version: 2,
            header: {},
            modules: [{}],
            dependencies: [{}]
        }, "" !== document.getElementById("bp.dep.name").value &&
        (d.header.name = document.getElementById("bp.dep.name").value), "" !== document.getElementById("bp.dep.description").value && (d.header.description = document.getElementById("bp.dep.description").value), d.header.uuid = g.generate_uuid(), d.header.version = [0, 0, 1], "none" !== document.getElementById("bp.dep.min_engine_version").value && (d.header.min_engine_version = JSON.parse(document.getElementById("bp.dep.min_engine_version").value)), d.modules[0].type = "data", d.modules[0].uuid = g.generate_uuid(), d.modules[0].version = [0, 0, 1], document.getElementById("bp.dep.metadata.checkbox").checked ? (d.metadata = {}, document.getElementById("bp.dep.author.element").style.display = "block", "" !== document.getElementById("bp.dep.author.name").value && (d.metadata.authors = [], e = document.getElementById("bp.dep.author.name").value, d.metadata.authors = e.split(",")), "" !== document.getElementById("bp.dep.author.url").value && (d.metadata.url = document.getElementById("bp.dep.author.url").value)) : document.getElementById("bp.dep.author.element").style.display =
        "none", document.getElementById("bp.dep.copy").onclick = function() {
            document.getElementById("bp.dep.code").select();
            document.getElementById("bp.dep.code").setSelectionRange(0, document.getElementById("bp.dep.code").value.length);
            document.execCommand("copy")
        }, document.getElementById("bp.dep.download").onclick = function() {
            var f = document.getElementById("bp.dep.code").value;
            f = new Blob([f], {
                type: "text/plain"
            });
            var a = document.createElement("a");
            a.download = "manifest.json";
            a.innerHTML = "Save";
            null != window.webkitURL ?
                a.href = window.webkitURL.createObjectURL(f) : (a.href = window.URL.createObjectURL(f), a.onclick = destroyClickedElement, a.style.display = "none", document.body.appendChild(a));
            a.click()
        }, b = {
            format_version: 2,
            header: {},
            modules: [{}],
            dependencies: [{}]
        }, "" !== document.getElementById("rp.dep.name").value && (b.header.name = document.getElementById("rp.dep.name").value), "" !== document.getElementById("rp.dep.description").value && (b.header.description = document.getElementById("rp.dep.description").value), b.header.uuid = g.generate_uuid(),
        b.header.version = [0, 0, 1], "none" !== document.getElementById("rp.dep.min_engine_version").value && (b.header.min_engine_version = JSON.parse(document.getElementById("rp.dep.min_engine_version").value)), b.modules[0].type = "resources", b.modules[0].uuid = g.generate_uuid(), b.modules[0].version = [0, 0, 1], document.getElementById("rp.dep.metadata.checkbox").checked ? (b.metadata = {}, document.getElementById("rp.dep.author.element").style.display = "block", "" !== document.getElementById("rp.dep.author.name").value && (b.metadata.authors = [], e = document.getElementById("rp.dep.author.name").value, b.metadata.authors = e.split(",")), "" !== document.getElementById("rp.dep.author.url").value && (b.metadata.url = document.getElementById("rp.dep.author.url").value)) : document.getElementById("rp.dep.author.element").style.display = "none", document.getElementById("rp.dep.copy").onclick = function() {
            document.getElementById("rp.dep.code").select();
            document.getElementById("rp.dep.code").setSelectionRange(0, document.getElementById("rp.dep.code").value.length);
            document.execCommand("copy")
        }, document.getElementById("rp.dep.download").onclick = function() {
            var f = document.getElementById("rp.dep.code").value;
            f = new Blob([f], {
                type: "text/plain"
            });
            var a = document.createElement("a");
            a.download = "manifest.json";
            a.innerHTML = "Save";
            null != window.webkitURL ? a.href = window.webkitURL.createObjectURL(f) : (a.href = window.URL.createObjectURL(f), a.onclick = destroyClickedElement, a.style.display = "none", document.body.appendChild(a));
            a.click()
        }, d.dependencies[0].uuid = b.header.uuid, d.dependencies[0].version =
        b.header.version, b.dependencies[0].uuid = d.header.uuid, b.dependencies[0].version = b.header.version, document.getElementById("bp.dep.code").value = JSON.stringify(d, null, 2), document.getElementById("rp.dep.code").value = JSON.stringify(b, null, 2))
}
writeManifest();